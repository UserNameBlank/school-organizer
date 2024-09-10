package com.schoolorganizer.app.database

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.schoolorganizer.app.database.entities.Homework
import com.schoolorganizer.app.database.entities.Subject
import com.schoolorganizer.app.database.entities.TimetableSlot
import java.util.Calendar
import java.util.Date

@CapacitorPlugin(name = "Database")
class DatabasePlugin : Plugin() {

    private lateinit var db: Database
    private val alarm = DatabaseAlarm()

    override fun load() {
        db = Database.getDatabase(context)

        // alarm.start(context)
    }

    @PluginMethod
    fun getSubjects(call: PluginCall) {
        val subjectDao = db.subjectDao()

        val subjects = subjectDao.getAll().map { it.toJSObject() }

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
    }

    @PluginMethod
    fun editSubject(call: PluginCall) {
        val subjectDao = db.subjectDao()

        val id = call.getInt("id")!!
        val name = call.getString("name")!!
        val color = call.getString("color")!!

        subjectDao.update(Subject(id, name, color))
    }

    @PluginMethod
    fun getHomeworks(call: PluginCall) {
        val homeworkDao = db.homeworkDao()

        val homeworks = homeworkDao.getAll().map { it.toJSObject() }

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
    }

    @PluginMethod
    fun removeOldHomework(call: PluginCall) {
        val homeworkDao = db.homeworkDao()

        homeworkDao.deleteOld(Date().time)
    }

    @PluginMethod
    fun setHomeworkDone(call: PluginCall) {
        val homeworkDao = db.homeworkDao()

        val id = call.getInt("id")!!
        val done = call.getBoolean("done")!!

        homeworkDao.setDone(id, done)
    }

    @PluginMethod
    fun setTimetableSlot(call: PluginCall) {
        val timetableDao = db.timetableDao()

        val id = call.getInt("id")!!
        val subjectId = call.getInt("subjectId")!!

        timetableDao.set(TimetableSlot(id, subjectId))
    }

    @PluginMethod
    fun getTimetableSlots(call: PluginCall) {
        val timetableDao = db.timetableDao()

        val slots = timetableDao.getAll().map { it.toJSObject() }

        val ret = JSObject()
        ret.put("slots", JSArray(slots))
        call.resolve(ret)
    }

    @PluginMethod
    fun clearTimetableSlot(call: PluginCall) {
        val timetableDao = db.timetableDao()

        val id = call.getInt("id")!!

        timetableDao.clear(id)
    }

    @PluginMethod
    fun setNotificationOptions(call: PluginCall) {
        val allow = call.getBoolean("allow")!!

        if (allow) {
            val timeString = call.getString("time") ?: "17:00"

            val first = timeString.substring(0..1).toInt()
            val second = timeString.substring(3..4).toInt()

            val time = Calendar.getInstance().apply {
                timeInMillis = System.currentTimeMillis()
                set(Calendar.HOUR_OF_DAY, first)
                set(Calendar.MINUTE, second)
            }

            alarm.start(context, time)
        } else {
            alarm.stop(context)
        }
    }

}
