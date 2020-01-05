<?php

namespace App\Http\Requests\Api\v1\Order;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrder extends FormRequest
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
            'note' => ['sometimes', 'string'],
            'client_id' => ['required', 'integer'],
            'machine_id' => ['required', 'integer'],
            'start_time' => ['required', 'date_format:d/m/Y H:i'],
            'end_time' => ['required', 'date_format:d/m/Y H:i'],
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
        $sanitized['start_time'] = Carbon::createFromFormat('d/m/Y H:i', $this->get('start_time'));
        $sanitized['end_time'] = Carbon::createFromFormat('d/m/Y H:i', $this->get('end_time'));

        return $sanitized;
    }
}
