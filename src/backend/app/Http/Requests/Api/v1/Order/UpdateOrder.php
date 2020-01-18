<?php

namespace App\Http\Requests\Api\v1\Order;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class UpdateOrder extends FormRequest
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
            'note' => ['nullable', 'string'],
            'client_id' => ['sometimes', 'integer'],
            'machine_id' => ['sometimes', 'integer'],
            'start_time' => ['sometimes', 'date_format:d/m/Y H:i'],
            'end_time' => ['sometimes', 'date_format:d/m/Y H:i'],
        ];
    }

    /**
     * Modify input data
     *
     * @return array
     */
    public function getSanitized(): array
    {
        $sanitized = $this->validated();

        if($this->has('start_time')){
            $sanitized['start_time'] = Carbon::createFromFormat('d/m/Y H:i', $this->get('start_time'));
        }

        if($this->has('end_time')){
            $sanitized['end_time'] = Carbon::createFromFormat('d/m/Y H:i', $this->get('end_time'));
        }

        return $sanitized;
    }
}
