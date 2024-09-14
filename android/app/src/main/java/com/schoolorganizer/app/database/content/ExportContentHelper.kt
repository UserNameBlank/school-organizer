package com.schoolorganizer.app.database.content

import android.content.ContentResolver
import android.content.Context
import android.net.Uri
import androidx.lifecycle.LiveData
import androidx.lifecycle.Observer
import androidx.work.Data
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.Operation
import androidx.work.WorkInfo
import androidx.work.WorkManager
import androidx.work.Worker
import androidx.work.WorkerParameters
import androidx.work.await
import com.schoolorganizer.app.database.Database
import org.json.JSONArray
import org.json.JSONObject
import java.util.UUID

object ExportContentHelper {

    class ExportContentWorker(
        private val context: Context,
        workerParams: WorkerParameters
    ) : Worker(context, workerParams) {

        private fun createOutputData(content: String): Data {
            return Data.Builder()
                .putString("content", content)
                .build()
        }

        override fun doWork(): Result {
            val db = Database.getDatabase(context)

            val subjectDao = db.subjectDao()
            val timetableDao = db.timetableDao()

            val subjects = subjectDao.getAll().map {
                it.toJSONObject()
            }
            val timetableSlots: Array<Int?> = arrayOfNulls(12*5)

            for (slot in timetableDao.getAll()) {
                timetableSlots[slot.id] = slot.subjectId
            }

            val obj = JSONObject()
            obj.put("subjects", JSONArray(subjects))
            obj.put("timetable", JSONArray(timetableSlots))
            val content = obj.toString()

            return Result.success(createOutputData(content))
        }

    }

    fun exportContent(context: Context): LiveData<WorkInfo> {
        val workRequest = OneTimeWorkRequestBuilder<ExportContentWorker>().build()
        val workManager = WorkManager.getInstance(context)
        workManager.enqueue(workRequest)
        return workManager.getWorkInfoByIdLiveData(workRequest.id)
    }

}