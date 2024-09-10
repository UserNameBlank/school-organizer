package com.schoolorganizer.app.database.entities

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.getcapacitor.JSObject

@Entity(tableName = "subjects")
class Subject(
    @PrimaryKey(autoGenerate = true) val id: Int,

    val name: String,
    val color: String,
) {

    fun toJSObject(): JSObject {
        val ret = JSObject()
        ret.put("id", id)
        ret.put("name", name)
        ret.put("color", color)
        return ret
    }

}
