package com.schoolorganizer.app.database.dao

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.schoolorganizer.app.database.entities.TimetableSlot

@Dao
interface TimetableDao {
    @Query("SELECT * from timetable")
    fun getAll(): List<TimetableSlot>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun set(slot: TimetableSlot);

    @Query("DELETE FROM timetable WHERE id = :id")
    fun clear(id: Int)
}