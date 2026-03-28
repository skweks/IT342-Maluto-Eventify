package edu.cit.maluto.eventify

import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.tabs.TabLayout
import retrofit2.*
import retrofit2.converter.gson.GsonConverterFactory

class MainActivity : AppCompatActivity() {
    // Track the role based on the Tab selection
    private var currentRole = "STUDENT"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize Retrofit ONLY ONCE to avoid "Conflicting declaration"
        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.0.2.2:8080/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        val apiService = retrofit.create(ApiService::class.java)

        val tabLayout = findViewById<TabLayout>(R.id.roleTabLayout)
        val etIdField = findViewById<EditText>(R.id.etIdField)
        val btnRegister = findViewById<Button>(R.id.btnRegister)

        // Handle the Toggle between Student and Organizer
        tabLayout.addOnTabSelectedListener(object : TabLayout.OnTabSelectedListener {
            override fun onTabSelected(tab: TabLayout.Tab?) {
                if (tab?.position == 0) {
                    currentRole = "STUDENT"
                    etIdField.hint = "Student ID (e.g., 23-6927-565)"
                    btnRegister.text = "REGISTER AS STUDENT"
                } else {
                    currentRole = "ORGANIZER"
                    etIdField.hint = "Organizer/Employee ID"
                    btnRegister.text = "REGISTER AS ORGANIZER"
                }
            }
            override fun onTabUnselected(tab: TabLayout.Tab?) {}
            override fun onTabReselected(tab: TabLayout.Tab?) {}
        })

        btnRegister.setOnClickListener {
            val user = User().apply {
                fullName = findViewById<EditText>(R.id.etFullName).text.toString()
                email = findViewById<EditText>(R.id.etEmail).text.toString()
                password = findViewById<EditText>(R.id.etPassword).text.toString()
                schoolId = etIdField.text.toString()
                role = currentRole // Sends the correct role to your Backend
            }

            apiService.registerUser(user).enqueue(object : Callback<User> {
                override fun onResponse(call: Call<User>, response: Response<User>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@MainActivity, "Registration Successful!", Toast.LENGTH_SHORT).show()
                        finish() // Go back to Login screen
                    } else {
                        Toast.makeText(this@MainActivity, "Registration Failed: ${response.code()}", Toast.LENGTH_SHORT).show()
                    }
                }
                override fun onFailure(call: Call<User>, t: Throwable) {
                    Toast.makeText(this@MainActivity, "Server Error: Check if Backend is running", Toast.LENGTH_LONG).show()
                }
            })
        }
    }
}