package com.schoolorganizer.app

import android.os.Bundle
import com.getcapacitor.BridgeActivity
import com.schoolorganizer.app.database.DatabasePlugin
import com.schoolorganizer.app.settings.PreferencesPlugin

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(PreferencesPlugin::class.java)
        registerPlugin(DatabasePlugin::class.java)

        super.onCreate(savedInstanceState)
    }
}
