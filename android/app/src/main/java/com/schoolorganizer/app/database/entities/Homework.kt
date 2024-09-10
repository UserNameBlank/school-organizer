package com.schoolorganizer.app.database.entities

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.getcapacitor.JSObject

@Entity(tableName = "homework")
class Homework(
    @PrimaryKey(autoGenerate = true) val id: Int,

    val desc: String,
    @ColumnInfo(name = "subject_id")
    val subjectId: Int,
    @ColumnInfo(name = "due_to")
    val dueTo: Long?,
    val done: Boolean,
) {

    fun toJSObject(): JSObject {
        val ret = JSObject()
        ret.put("id", id)
        ret.put("desc", desc)
        ret.put("subjectId", subjectId)
        ret.put("dueTo", dueTo)
        ret.put("done", done)
        return ret
    }

}
