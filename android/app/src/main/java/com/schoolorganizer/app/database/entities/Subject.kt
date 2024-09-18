package com.schoolorganizer.app.database.entities

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import org.json.JSONObject

@Entity(
    tableName = "subjects",
    indices = [
        Index(value = ["name"], unique = true)
    ]
)
class Subject(
    @PrimaryKey(autoGenerate = true)
    val id: Int,

    val name: String,
    val color: String,
) {

    fun toJSONObject(): JSONObject {
        val ret = JSONObject()
        ret.put("id", id)
        ret.put("name", name)
        ret.put("color", color)
        return ret
    }

    companion object {
        fun fromJSONObject(obj: JSONObject): Subject {
            val name = obj.getString("name")
            val color = obj.getString("color")
            return Subject(0, name, color)
        }
    }

}
