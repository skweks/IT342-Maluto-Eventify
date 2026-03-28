package edu.cit.maluto.eventify

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class OrganizerDashboardActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard_organizer)

        val btnCreate = findViewById<Button>(R.id.btnCreateEventPlaceholder)
        btnCreate.setOnClickListener {
            Toast.makeText(this, "Create Event feature coming in Phase 3!", Toast.LENGTH_SHORT).show()
        }
    }
}