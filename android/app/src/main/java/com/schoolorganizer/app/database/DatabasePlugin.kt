package com.schoolorganizer.app.database

import android.Manifest
import android.app.Activity
import android.app.AlarmManager
import android.content.Intent
import android.net.Uri
import android.util.Log
import android.widget.Toast
import androidx.activity.result.ActivityResult
import androidx.work.WorkInfo
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.ActivityCallback
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import com.getcapacitor.annotation.PermissionCallback
import com.schoolorganizer.app.database.content.ExportContentHelper
import com.schoolorganizer.app.database.content.ImportContentHelper
import com.schoolorganizer.app.database.entities.Homework
import com.schoolorganizer.app.database.entities.Subject
import com.schoolorganizer.app.database.entities.TimetableSlot
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.util.Calendar
import java.util.Date

@CapacitorPlugin(
    name = "Database",
    permissions = [
        Permission(
            alias = "notifications",
            strings = [ Manifest.permission.POST_NOTIFICATIONS ]
        )
    ]
)
class DatabasePlugin : Plugin() {

    private lateinit var db: Database

    override fun load() {
        db = Database.getDatabase(context)

        DatabaseAlarm.startFromPreferences(context)
    }

    @PluginMethod
    fun getSubjects(call: PluginCall) {
        val subjectDao = db.subjectDao()

        val subjects = subjectDao.getAll().map { it.toJSONObject() }

        val ret = JSObject()
        ret.put("subjects", JSArray(subjects))
        call.resolve(ret)
    }

    @PluginMethod
    fun addSubject(call: PluginCall) {
        val subjectDao = db.subjectDao()

        val name = call.getString("name")!!
        val color = call.getString("color")!!

        val id = subjectDao.insert(Subject(0, name, color))

        val ret = JSObject()
        ret.put("id", id)
        call.resolve(ret)
    }

    @PluginMethod
    fun removeSubject(call: PluginCall) {
        val subjectDao = db.subjectDao()

        val id = call.getInt("id")!!

        subjectDao.deleteById(id)

        call.resolve()
    }

    @PluginMethod
    fun editSubject(call: PluginCall) {
        val subjectDao = db.subjectDao()

        val id = call.getInt("id")!!
        val name = call.getString("name")!!
        val color = call.getString("color")!!

        subjectDao.update(Subject(id, name, color))

        call.resolve()
    }

    @PluginMethod
    fun getHomeworks(call: PluginCall) {
        val homeworkDao = db.homeworkDao()

        val homeworks = homeworkDao.getAll().map { it.toJSONObject() }

        val ret = JSObject()
        ret.put("homeworks", JSArray(homeworks))
        call.resolve(ret)
    }

    @PluginMethod
    fun addHomework(call: PluginCall) {
        val homeworkDao = db.homeworkDao()

        val desc = call.getString("desc")!!
        val subjectId = call.getInt("subjectId")!!
        val dueTo = call.getLong("dueTo")

        val id = homeworkDao.insert(Homework(0, desc, subjectId, dueTo, false))

        val ret = JSObject()
        ret.put("id", id)
        call.resolve(ret)
    }

    @PluginMethod
    fun removeHomework(call: PluginCall) {
        val homeworkDao = db.homeworkDao()

        val id = call.getInt("id")!!

        homeworkDao.deleteById(id)

        call.resolve()
    }

    @PluginMethod
    fun removeOldHomework(call: PluginCall) {
        val homeworkDao = db.homeworkDao()

        homeworkDao.deleteOld(Date().time)

        call.resolve()
    }

    @PluginMethod
    fun setHomeworkDone(call: PluginCall) {
        val homeworkDao = db.homeworkDao()

        val id = call.getInt("id")!!
        val done = call.getBoolean("done")!!

        homeworkDao.setDone(id, done)

        call.resolve()
    }

    @PluginMethod
    fun setTimetableSlot(call: PluginCall) {
        val timetableDao = db.timetableDao()

        val id = call.getInt("id")!!
        val subjectId = call.getInt("subjectId")!!

        timetableDao.set(TimetableSlot(id, subjectId))

        call.resolve()
    }

    @PluginMethod
    fun getTimetableSlots(call: PluginCall) {
        val timetableDao = db.timetableDao()

        val slots = timetableDao.getAll().map { it.toJSONObject() }

        val ret = JSObject()
        ret.put("slots", JSArray(slots))
        call.resolve(ret)
    }

    @PluginMethod
    fun clearTimetableSlot(call: PluginCall) {
        val timetableDao = db.timetableDao()

        val id = call.getInt("id")!!

        timetableDao.clear(id)

        call.resolve()
    }

    @PluginMethod
    fun setNotificationOptions(call: PluginCall) {
        val allow = call.getBoolean("allow")!!

        if (allow) {
            if (getPermissionState("notifications") != PermissionState.GRANTED) {
                Log.i("DATABASE", "trying to get notification permission")
                requestPermissionForAlias("notifications",
                    call, "allowNotificationCallback")
                return
            } else {
                allowNotificationOptions(call)
            }
        } else {
            DatabaseAlarm.stop(context)
        }

        call.resolve()
    }

    @PermissionCallback
    fun allowNotificationCallback(call: PluginCall) {
        if (getPermissionState("notifications") == PermissionState.GRANTED) {
            allowNotificationOptions(call)
            call.resolve()
        } else {
            Toast.makeText(context, "Can't display notifications", Toast.LENGTH_SHORT).show()
            call.reject("notification permission not given")
        }
    }

    private fun allowNotificationOptions(call: PluginCall) {
        val timeString = call.getString("time") ?: "17:00"
        val interval = call.getLong("interval") ?: AlarmManager.INTERVAL_DAY

        val first = timeString.substring(0..1).toInt()
        val second = timeString.substring(3..4).toInt()

        val time = Calendar.getInstance().apply {
            timeInMillis = System.currentTimeMillis()
            set(Calendar.HOUR_OF_DAY, first)
            set(Calendar.MINUTE, second)
        }

        DatabaseAlarm.start(context, time, interval)
    }

    @PluginMethod
    fun exportContent(call: PluginCall) {
        val intent = Intent().apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "application/json"
            action = Intent.ACTION_CREATE_DOCUMENT
            putExtra(Intent.EXTRA_TITLE, "content.json")
        }

        startActivityForResult(
            call,
            intent,
            "exportContentResult"
        )
    }

    @PluginMethod
    fun importContent(call: PluginCall) {
        val intent = Intent().apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            type = "application/json"
            action = Intent.ACTION_GET_CONTENT
            putExtra(Intent.EXTRA_ALLOW_MULTIPLE, false)
        }

        startActivityForResult(
            call,
            intent,
            "importContentResult"
        )
    }

    @ActivityCallback
    fun exportContentResult(call: PluginCall, result: ActivityResult) {
        when (result.resultCode) {
            Activity.RESULT_OK -> {
                result.data?.data?.let { uri ->
                    exportContentFrom(uri)
                }
                call.resolve()
            }
            Activity.RESULT_CANCELED -> call.reject("cancelled export")
            else -> call.reject("failed to export content")
        }
    }

    @ActivityCallback
    fun importContentResult(call: PluginCall, result: ActivityResult) {
        when (result.resultCode) {
            Activity.RESULT_OK -> {
                result.data?.data?.let { uri ->
                    importContentFrom(uri)
                }
                call.resolve()
            }
            Activity.RESULT_CANCELED -> call.reject("cancelled import")
            else -> call.reject("failed to import content")
        }
    }

    private fun exportContentFrom(uri: Uri) {
        ExportContentHelper.exportContent(context).observe(activity) {
            if (it.state == WorkInfo.State.SUCCEEDED) {
                val content = it.outputData.getString("content")!!

                activity.contentResolver.openOutputStream(uri)?.let { outputStream ->
                    val writer = OutputStreamWriter(outputStream)
                    writer.write(content)
                    writer.close()
                }
            }
        }
    }

    private fun importContentFrom(uri: Uri) {
        activity.contentResolver.openInputStream(uri)?.let { inputStream ->
            val reader = InputStreamReader(inputStream)
            val text = reader.readText()
            inputStream.close()

            ImportContentHelper.importContent(context, text).observe(activity) {
                if (it.state == WorkInfo.State.SUCCEEDED) {
                    notifyListeners("contentImported", null)
                }
            }
        }
    }

}
