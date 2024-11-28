package com.schoolorganizer.app.database

import android.content.Context
import androidx.room.AutoMigration
import androidx.room.Room
import androidx.room.RoomDatabase
import com.schoolorganizer.app.database.dao.HomeworkDao
import com.schoolorganizer.app.database.dao.SubjectDao
import com.schoolorganizer.app.database.dao.TimetableDao
import com.schoolorganizer.app.database.entities.Homework
import com.schoolorganizer.app.database.entities.Subject
import com.schoolorganizer.app.database.entities.TimetableSlot

@androidx.room.Database(
    entities = [
        Subject::class,
        Homework::class,
        TimetableSlot::class
    ],
    version = 3,
)
abstract class Database : RoomDatabase() {
    companion object {
        private var INSTANCE: Database? = null

        fun getDatabase(context: Context): Database {
            synchronized(this) {
                if (INSTANCE == null) {
                    INSTANCE = Room
                        .databaseBuilder(context, Database::class.java, "default")
                        .build()
                }
                return INSTANCE as Database
            }
        }
    }

    abstract fun subjectDao(): SubjectDao
    abstract fun homeworkDao(): HomeworkDao
    abstract fun timetableDao(): TimetableDao
}