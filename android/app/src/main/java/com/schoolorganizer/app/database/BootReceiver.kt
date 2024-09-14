package com.schoolorganizer.app.database

import android.annotation.SuppressLint
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi

class BootReceiver : BroadcastReceiver() {

    @SuppressLint("UnsafeProtectedBroadcastReceiver") // This is no security app
    @RequiresApi(Build.VERSION_CODES.N)
    override fun onReceive(context: Context?, unusedIntent: Intent?) {
        assert(context != null) { Log.e("BOOT RECEIVER", "context is null!") }
        DatabaseAlarm.startFromPreferences(context!!)
    }

}