package com.schoolorganizer.app.database.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.schoolorganizer.app.database.entities.Subject;

@Dao
interface SubjectDao {
    @Query("SELECT * from subjects")
    fun getAll(): List<Subject>;

    @Insert(onConflict = OnConflictStrategy.ABORT)
    fun insert(subject: Subject): Long

    @Query("DELETE FROM subjects WHERE id = :id")
    fun deleteById(id: Int)

    @Update
    fun update(subject: Subject);
}