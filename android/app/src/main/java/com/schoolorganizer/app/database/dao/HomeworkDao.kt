package com.schoolorganizer.app.database.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.schoolorganizer.app.database.entities.Homework

@Dao
interface HomeworkDao {
    @Query("SELECT * FROM homework")
    fun getAll(): List<Homework>

    @Insert(onConflict = OnConflictStrategy.ABORT)
    fun insert(homework: Homework): Long

    @Query("DELETE FROM homework WHERE id = :id")
    fun deleteById(id: Int)

    @Query("DELETE FROM homework WHERE due_to IS NOT NULL AND done > 0 AND due_to < :timestamp")
    fun deleteOld(timestamp: Long)

    @Query("UPDATE homework SET done = :done WHERE id = :id")
    fun setDone(id: Int, done: Boolean)

    @Query("SELECT COUNT(*) FROM homework WHERE due_to IS NOT NULL AND done = 0")
    fun countUndone(): Int
}