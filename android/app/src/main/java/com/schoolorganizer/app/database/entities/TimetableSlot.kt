package com.schoolorganizer.app.database.entities

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import org.json.JSONObject

@Entity(tableName = "timetable")
class TimetableSlot(
    @PrimaryKey val id: Int,
    @ColumnInfo(name = "subject_id")
    val subjectId: Int,
) {

    fun toJSONObject(): JSONObject {
        val ret = JSONObject()
        ret.put("id", id)
        ret.put("subjectId", subjectId)
        return ret
    }

}