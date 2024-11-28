package com.schoolorganizer.app.database.dao

import android.content.Context
import androidx.room.Dao
import androidx.room.Embedded
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Relation
import androidx.room.Transaction
import androidx.room.Update
import com.schoolorganizer.app.database.entities.Homework
import com.schoolorganizer.app.database.entities.Subject
import org.json.JSONArray
import org.json.JSONObject
import java.util.UUID

@Dao
interface SubjectDao {

    class SubjectWithHomework(
        @Embedded val subject: Subject,
        @Relation(
            parentColumn = "id",
            entityColumn = "subject_id"
        )
        val homework: List<Homework>
    ) {

        fun toJSONObject(): JSONObject {
            val ret = JSONObject()

            ret.put("id", subject.id)
            ret.put("name", subject.name)
            ret.put("color", subject.color)

            val homework = homework.map {
                it.toJSONObject()
            }
            ret.put("homeworks", JSONArray(homework))

            return ret
        }

    }

    @Query("SELECT * from subjects")
    fun getAll(): List<Subject>;

    @Transaction
    @Query("SELECT * from subjects")
    fun getAllWithHomework(): List<SubjectWithHomework>

    @Insert(onConflict = OnConflictStrategy.ABORT)
    fun insert(subject: Subject): Long

    @Query("DELETE FROM subjects WHERE id = :id")
    fun deleteById(id: Int)

    @Update
    fun update(subject: Subject);

}