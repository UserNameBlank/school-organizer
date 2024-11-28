package com.schoolorganizer.app.settings

import android.content.SharedPreferences
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "AppPreferences")
class PreferencesPlugin : Plugin() {

    private lateinit var sharedPreferences: SharedPreferences

    override fun load() {
        try {
            sharedPreferences = Preferences.getInstance(context)
        } catch (e: Exception) {
            val obj = JSObject()
            obj.put("stacktrace", e.stackTraceToString())
            obj.put("message", e.message)
            obj.put("clazz", e.javaClass.name)
            notifyListeners("errorReceived", obj)
        }
    }

    @PluginMethod
    fun getString(call: PluginCall) {
        val key = call.getString("key")!!

        val value = sharedPreferences.getString(key, null)

        val ret = JSObject()
        ret.put("value", value)
        call.resolve(ret)
    }

    @PluginMethod
    fun setString(call: PluginCall) {
        val key = call.getString("key")!!
        val value = call.getString("value")!!

        val editor = sharedPreferences.edit()
        editor.putString(key, value)
        editor.apply()

        call.resolve()
    }

    @PluginMethod
    fun getLong(call: PluginCall) {
        val key = call.getString("key")!!

        val value = if (sharedPreferences.contains(key))
            sharedPreferences.getLong(key, 0) else null

        val ret = JSObject()
        ret.put("value", value)
        call.resolve(ret)
    }

    @PluginMethod
    fun setLong(call: PluginCall) {
        val key = call.getString("key")!!
        val value = call.getInt("value")!!

        val editor = sharedPreferences.edit()
        editor.putLong(key, value.toLong())
        editor.apply()

        call.resolve()
    }

}