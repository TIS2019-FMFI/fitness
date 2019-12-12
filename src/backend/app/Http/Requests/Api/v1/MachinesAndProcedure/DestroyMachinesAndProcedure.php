<?php

namespace App\Http\Requests\Api\v1\MachinesAndProcedure;

use Illuminate\Foundation\Http\FormRequest;

class DestroyMachinesAndProcedure extends FormRequest
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
        return [];
    }
}