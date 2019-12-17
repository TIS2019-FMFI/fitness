<?php

namespace App\Http\Requests\Api\v1\Order;

use Illuminate\Foundation\Http\FormRequest;

class IndexOrder extends FormRequest
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
            'orderBy' => ['in:id', 'nullable'],
            'orderDirection' => ['in:asc,desc', 'nullable'],
            'page' => ['integer', 'nullable'],
            'per_page' => ['integer', 'nullable'],
            'from' => ['sometime', 'date_format:Y-m-d H:i:s'],
            'to' => ['sometime', 'date_format:Y-m-d H:i:s'],
        ];
    }
}
