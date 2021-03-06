<?php

namespace App\Http\Requests\Api\v1\Client;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClient extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'first_name' => ['sometimes', 'string'],
            'last_name' => ['sometimes', 'string'],
            'phone' => ['sometimes', 'string'],
            'active' => ['sometimes', 'boolean'],
            'has_multisport_card' => ['sometimes', 'boolean'],
            'note' => ['nullable', 'string'],
            'is_gdpr' => ['sometimes', 'boolean'],
        ];
    }
}
