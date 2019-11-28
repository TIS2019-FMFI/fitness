<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrder extends FormRequest
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
    public function rules() : array
    {
        return [
            'note' => ['required', 'string'],
            'client_id' => ['required', 'integer'],
            'machine_id' => ['required', 'integer'],
            'start_time' => ['required', 'timestamp'],
            'end_time' => ['required', 'timestamp'],
        ];
    }
}
