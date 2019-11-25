<?php

namespace App\Http\Requests\Api\v1\MachinesAndProcedures;

use Illuminate\Foundation\Http\FormRequest;

class StoreMachinesAndProcedure extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        //TODO authorize for action
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
            'name' => ['required', 'string'],
            'active' => ['required', 'boolean'],
            'is_for_multisport_card' => ['required', 'boolean'],
        ];
    }
}