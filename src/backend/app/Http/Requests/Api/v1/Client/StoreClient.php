<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClient extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() : bool
    {
        //TODO authorize for action
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'active' => ['required', 'boolean'],
            'has_multisport_card' => ['required', 'boolean'],
            'note' => ['sometimes', 'string'],
            'is_gdpr' => ['required', 'boolean']
        ];
    }
}
