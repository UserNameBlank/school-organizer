package com.schoolorganizer.app.database

import android.Manifest
import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Color
import android.os.Build
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.schoolorganizer.app.MainActivity
import com.schoolorganizer.app.R
import com.schoolorganizer.app.settings.Preferences
import java.util.Calendar

class DatabaseAlarm : BroadcastReceiver() {

    class DatabaseAlarmWorker(
        private val context: Context,
        workerParameters: WorkerParameters
    ) : Worker(context, workerParameters) {

        companion object {
            private const val DATABASE_NOTIFICATION_CHANNEL = "Database Notify Channel"
            private const val DATABASE_NOTIFICATION_ID = 1337
        }

        private fun triggerNotification(count: Int) {
//            if (ActivityCompat.checkSelfPermission(
//                    context,
//                    Manifest.permission.POST_NOTIFICATIONS
//                ) != PackageManager.PERMISSION_GRANTED
//            ) {
//                //TODO: maybe make it ask again
//                return
//            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val importance = NotificationManager.IMPORTANCE_DEFAULT

                val channel = NotificationChannel(
                    DATABASE_NOTIFICATION_CHANNEL,
                    DATABASE_NOTIFICATION_CHANNEL,
                    importance
                ).apply {
                    description = context.getString(R.string.notification_channel_database)
                    lightColor = Color.BLACK
                }

                val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE)
                    as NotificationManager
                notificationManager.createNotificationChannel(channel)
            }

            val intent = Intent(context, MainActivity::class.java)
            val pendingIntent = PendingIntent.getActivity(context, 1, intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)

            val notificationBuilder = NotificationCompat.Builder(context, DATABASE_NOTIFICATION_CHANNEL)
                .setSmallIcon(R.drawable.splash)
                .setContentTitle(context.getString(R.string.notification_database_title))
                .setContentText(context.getString(R.string.notification_database_text, count))
                .setContentIntent(pendingIntent)
                .setAutoCancel(true)
                .setPriority(NotificationCompat.PRIORITY_HIGH)

            with(NotificationManagerCompat.from(context)) {
                if (ActivityCompat.checkSelfPermission(
                    this@DatabaseAlarmWorker.context,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED) {
                    return@with;
                }

                notify(DATABASE_NOTIFICATION_ID, notificationBuilder.build())
            }
        }

        override fun doWork(): Result {
            val db = Database.getDatabase(context)
            val homeworkDao = db.homeworkDao()

            val count = homeworkDao.countUndone();

            if (count > 0) {
                triggerNotification(count)
            }

            return Result.success()
        }

    }

    companion object {
        private const val DATABASE_ALARM_ACTION = "database alarm action";
        private const val DATABASE_ALARM_CODE = 1001;

        fun startFromPreferences(context: Context) {
            val sharedPreferences = Preferences.getInstance(context)

            if (sharedPreferences.getString("show-notifications", null) == "true") {
                val time = sharedPreferences.getString("notification-time", "17:00")!!.let {
                    val first = it.substring(0..1).toInt()
                    val second = it.substring(3..4).toInt()

                    Calendar.getInstance().apply {
                        timeInMillis = System.currentTimeMillis()
                        set(Calendar.HOUR_OF_DAY, first)
                        set(Calendar.MINUTE, second)

                        if (timeInMillis < System.currentTimeMillis()) {
                            add(Calendar.HOUR, 24)
                        }
                    }
                }
                val interval = sharedPreferences.getLong("notification-interval", 86400000L)

                Log.i("DATABASE",
                    "starting database notifier with time: ${time.timeInMillis} interval: $interval")

                start(context, time, interval)
            }
        }

        fun start(context: Context, time: Calendar, interval: Long) {
            val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            val intent = Intent(context, DatabaseAlarm::class.java).apply {
                action = DATABASE_ALARM_ACTION
            }
            val pendingIntent = PendingIntent.getBroadcast(context, DATABASE_ALARM_CODE, intent,
                PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_CANCEL_CURRENT)

            alarmManager.setInexactRepeating(AlarmManager.RTC_WAKEUP, time.timeInMillis,
                interval, pendingIntent)
        }

        fun stop(context: Context) {
            val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            val intent = Intent(context, DatabaseAlarm::class.java).apply {
                action = DATABASE_ALARM_ACTION
            }
            val pendingIntent = PendingIntent.getBroadcast(context, DATABASE_ALARM_CODE, intent,
                PendingIntent.FLAG_CANCEL_CURRENT or PendingIntent.FLAG_IMMUTABLE)

            alarmManager.cancel(pendingIntent)
            pendingIntent.cancel()
        }
    }

    private val notificationWork = OneTimeWorkRequestBuilder<DatabaseAlarmWorker>().build()

    override fun onReceive(context: Context?, intent: Intent?) {
        WorkManager.getInstance(context!!).enqueue(notificationWork)
    }

}