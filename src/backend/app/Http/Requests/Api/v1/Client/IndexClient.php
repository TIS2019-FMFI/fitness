<?php

namespace App\Http\Requests\Api\v1\Client;

use Illuminate\Foundation\Http\FormRequest;

class IndexClient extends FormRequest
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
            'orderBy' => ['in:id', 'nullable'],
            'orderDirection' => ['in:asc,desc', 'nullable'],
            'page' => ['integer', 'nullable'],
            'perPage' => ['integer', 'nullable'],
            'data' => ['string', 'nullable'],
        ];
    }
}
