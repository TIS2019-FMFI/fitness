<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Requests\Api\v1\User\LoginUserOwn;
use App\Http\Requests\Api\v1\User\RegisterUserOwn;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use JWTAuthException;
use App\Http\Controllers\Controller;


class UserController extends Controller
{

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

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)
            ->get()
            ->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();

            $response = [
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'auth_token' => $user->auth_token,
                    'name' => $user->name,
                    'email' => $user->email
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

    public function register(Request $request) {
        $payload = [
            'password' => Hash::make($request->password),
            'email' => $request->email,
            'name' => $request->name,
            'auth_token' => ''
        ];

        $user = new User($payload);
        if ($user->save()) {
            $token = self::getToken($request->email, $request->password);

            if (!is_string($token)) {
                return response()->json([
                    'success' => false,
                    'data' => 'Token generation failed'
                ], 201);
            }

            $user = User::where('email', $request->email)
                ->get()
                ->first();

            $user->auth_token = $token;
            $user->save();
            $response = [
                'success'=>true,
                'data'=> [
                    'name' => $user->name,
                    'id' => $user->id,
                    'email' => $request->email,
                    'auth_token' => $token
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
}