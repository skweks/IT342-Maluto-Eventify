package edu.cit.maluto.eventify

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val retrofit = Retrofit.Builder()
            .baseUrl("http://10.0.2.2:8080/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        val apiService = retrofit.create(ApiService::class.java)

        // Redirect to Registration
        findViewById<TextView>(R.id.tvRegisterLink).setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }

        findViewById<Button>(R.id.btnLogin).setOnClickListener {
            val email = findViewById<EditText>(R.id.etLoginEmail).text.toString()
            val password = findViewById<EditText>(R.id.etLoginPassword).text.toString()

            val credentials = mapOf("email" to email, "password" to password)

            apiService.loginUser(credentials).enqueue(object : Callback<User> {
                override fun onResponse(call: Call<User>, response: Response<User>) {
                    if (response.isSuccessful) {
                        val user = response.body()
                        Toast.makeText(this@LoginActivity, "Welcome, ${user?.fullName}!", Toast.LENGTH_SHORT).show()

                        // Role-based redirection
                        if (user?.role == "STUDENT") {
                            startActivity(Intent(this@LoginActivity, StudentDashboardActivity::class.java))
                        } else {
                            startActivity(Intent(this@LoginActivity, OrganizerDashboardActivity::class.java))
                        }
                        finish()
                    } else {
                        Toast.makeText(this@LoginActivity, "Invalid email or password", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<User>, t: Throwable) {
                    Toast.makeText(this@LoginActivity, "Connection Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}