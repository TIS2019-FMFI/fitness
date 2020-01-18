<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Requests\Api\v1\User\LoginUser;
use App\Http\Requests\Api\v1\User\RegisterUser;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use JWTAuthException;
use App\Http\Controllers\Controller;



class UserController extends Controller
{

    /**
     * Get token
     *
     * @param $email
     * @param $password
     * @return JsonResponse|null
     */
    private function getToken($email, $password)
    {
        $token = null;

        try {
            if (!$token = JWTAuth::attempt([
                'email'=>$email,
                'password'=>$password
            ])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token' => $token
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }

        return $token;
    }

    /**
     * Login user
     *
     * @param LoginUser $request
     * @return JsonResponse
     */
    public function login(LoginUser $request): JsonResponse
    {
        $sanitized = $request->validated();
        $user = User::where('email', $sanitized['email'])->get()->first();

        if ($user && Hash::check( $sanitized['password'], $user->password)) {
            $token = self::getToken( $sanitized['email'],  $sanitized['password']);
            $user->auth_token = $token;
            $user->save();

            $response = [
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'auth_token' => $user->auth_token,
                    'name' => $user->name,
                    'email' => $user->email,
                    'expires_in' => auth('api')->factory()->getTTL() * 60
                ]
            ];
        } else {
            $response = [
                'success' => false,
                'data' => 'Record doesnt exists'
            ];
        }

        return response()->json($response, 201);
    }

    /**
     * Register newly created user
     *
     * @param RegisterUser $request
     * @return JsonResponse
     */
    public function register(RegisterUser $request): JsonResponse {
        $sanitized = $request->validated();

        $payload = [
            'password' => Hash::make($sanitized['password']),
            'email' => $sanitized['email'],
            'name' => $sanitized['name'],
            'auth_token' => ''
        ];

        $user = new User($payload);

        if ($user->save()) {
            $token = self::getToken($sanitized['email'], $sanitized['password']);

            if (!is_string($token)) {
                return response()->json([
                    'success' => false,
                    'data' => 'Token generation failed'
                ], 201);
            }

            $user = User::where('email', $sanitized['email'])->get()->first();

            $user->auth_token = $token;
            $user->save();
            $response = [
                'success'=>true,
                'data'=> [
                    'name' => $user->name,
                    'id' => $user->id,
                    'email' => $request->email,
                    'auth_token' => $token,
                    'expires_in' => auth('api')->factory()->getTTL() * 60
                ]
            ];
        }
        else {
            $response = [
                'success' => false,
                'data' => 'Couldnt register user'
            ];
        }

        return response()->json($response, 201);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth('api')->logout();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     * @return JsonResponse
     */
    protected function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

}