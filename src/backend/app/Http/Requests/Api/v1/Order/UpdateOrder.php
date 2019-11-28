<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOrder extends FormRequest
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
            'note' => ['sometimes', 'string'],
            'client_id' => ['sometimes', 'integer'],
            'machine_id' => ['sometimes', 'integer'],
            'start_time' => ['sometimes', 'timestamp'],
            'end_time' => ['sometimes', 'timestamp'],
        ];
    }
}
