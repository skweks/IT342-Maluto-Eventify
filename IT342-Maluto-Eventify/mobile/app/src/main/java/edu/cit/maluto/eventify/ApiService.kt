package edu.cit.maluto.eventify
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST


interface ApiService {
    @POST("api/v1/auth/register")
    fun registerUser(@Body user: User): Call<User>

    @POST("api/v1/auth/login")
    fun loginUser(@Body credentials: Map<String, String>): Call<User>
}

