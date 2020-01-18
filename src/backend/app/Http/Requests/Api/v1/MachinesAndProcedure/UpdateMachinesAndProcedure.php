<?php

namespace App\Http\Requests\Api\v1\MachinesAndProcedure;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMachinesAndProcedure extends FormRequest
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
            'name' => ['sometimes', 'string'],
            'active' => ['sometimes', 'boolean'],
            'is_for_multisport_card' => ['sometimes', 'boolean'],
        ];
    }
}
