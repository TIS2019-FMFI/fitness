<?php

namespace App\Http\Requests\Api\v1\Client;

use Illuminate\Foundation\Http\FormRequest;

class StoreClient extends FormRequest
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
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'active' => ['required', 'boolean'],
            'has_multisport_card' => ['required', 'boolean'],
            'note' => ['nullable', 'string'],
            'is_gdpr' => ['required', 'boolean'],
        ];
    }
}
