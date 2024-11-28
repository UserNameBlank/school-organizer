package com.schoolorganizer.app.database.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.schoolorganizer.app.database.entities.Homework
import java.util.UUID

@Dao
interface HomeworkDao {
    @Query("SELECT * FROM homework")
    fun getAll(): List<Homework>

    @Query("SELECT image FROM homework WHERE id = :id")
    fun getImageById(id: Int): UUID?

    @Insert(onConflict = OnConflictStrategy.ABORT)
    fun insert(homework: Homework): Long

    @Query("DELETE FROM homework WHERE id = :id")
    fun deleteById(id: Int)

    @Query("DELETE FROM homework WHERE subject_id = :id")
    fun deleteBySubjectId(id: Int)

    @Query("DELETE FROM homework WHERE due_to IS NOT NULL AND done > 0 AND due_to < :timestamp")
    fun deleteOld(timestamp: Long)

    @Query("UPDATE homework SET done = :done WHERE id = :id")
    fun setDone(id: Int, done: Boolean)

    @Query(
        "SELECT COUNT(*) FROM homework WHERE due_to IS NOT NULL AND done = 0"
    )
    fun countUndone(): Int
}