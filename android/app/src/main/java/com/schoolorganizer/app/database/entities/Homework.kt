package com.schoolorganizer.app.database.entities

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import com.schoolorganizer.app.MainActivity
import org.json.JSONObject
import java.util.UUID

@Entity(tableName = "homework")
class Homework(
    @PrimaryKey(autoGenerate = true) val id: Int,

    val desc: String,
    @ColumnInfo(name = "subject_id")
    val subjectId: Int,
    @ColumnInfo(name = "due_to")
    val dueTo: Long?,
    val done: Boolean,
    val image: UUID?,
) {

    fun toJSONObject(): JSONObject {
        val ret = JSONObject()
        ret.put("id", id)
        ret.put("desc", desc)
        ret.put("subjectId", subjectId)
        ret.put("dueTo", dueTo)
        ret.put("done", done)
        ret.put("image", image?.let { "${MainActivity.IMAGE_RESOURCE_URL}/$image" })
        return ret
    }

}
