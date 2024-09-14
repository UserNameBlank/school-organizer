package com.schoolorganizer.app.database.content

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.work.Data
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkInfo
import androidx.work.WorkManager
import androidx.work.Worker
import androidx.work.WorkerParameters
import com.schoolorganizer.app.database.Database
import com.schoolorganizer.app.database.entities.Subject
import com.schoolorganizer.app.database.entities.TimetableSlot
import org.json.JSONException
import org.json.JSONObject

object ImportContentHelper {

    class ImportContentWorker(
        private val context: Context,
        workerParams: WorkerParameters
    ) : Worker(context, workerParams) {

        override fun doWork(): Result {
            val content = inputData.getString("content")!!
            val obj = JSONObject(content)

            val db = Database.getDatabase(context)

            val subjectDao = db.subjectDao()
            val timetableDao = db.timetableDao()

            val subjects = obj.getJSONArray("subjects")
            val idMap = HashMap<Int, Int>()

            for (i in 0..<subjects.length()) {
                val jsonObj = subjects.getJSONObject(i)
                val subject = Subject.fromJSONObject(jsonObj)

                val id = subjectDao.insert(subject)

                idMap[jsonObj.getInt("id")] = id.toInt()
            }

            val timetableSlots = obj.getJSONArray("timetable")
            for (i in 0..timetableSlots.length()) {
                try {
                    val subjectId = timetableSlots.getInt(i)
                    timetableDao.set(TimetableSlot(i, idMap[subjectId]!!))
                } catch (_: JSONException) {}
            }

            return Result.success()
        }

    }

    private fun createInputData(content: String): Data {
        return Data.Builder()
            .putString("content", content)
            .build()
    }

    fun importContent(context: Context, content: String): LiveData<WorkInfo> {
        val workRequest = OneTimeWorkRequestBuilder<ImportContentWorker>()
            .setInputData(createInputData(content))
            .build()
        val workManager = WorkManager.getInstance(context)
        workManager.enqueue(workRequest)
        return workManager.getWorkInfoByIdLiveData(workRequest.id)
    }

}