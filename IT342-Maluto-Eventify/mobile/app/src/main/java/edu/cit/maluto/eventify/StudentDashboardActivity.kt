package edu.cit.maluto.eventify

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class StudentDashboardActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard_student)

        // This line works now that the ID is added to your XML
        val welcomeText = findViewById<TextView>(R.id.welcomeStudent)
        welcomeText.text = "Student Dashboard"
    }
}