package com.schoolorganizer.app.settings

import android.content.Context
import android.content.SharedPreferences

private const val PREFERENCES_ID = "settings"

class Preferences(
    context: Context
) {

    private val sharedPreferences = context.getSharedPreferences(PREFERENCES_ID, Context.MODE_PRIVATE)

    companion object {
        private var INSTANCE: Preferences? = null

        fun getInstance(context: Context): SharedPreferences {
            synchronized(this) {
                if (INSTANCE == null) {
                    INSTANCE = Preferences(context)
                }

                return INSTANCE!!.sharedPreferences
            }
        }
    }

}