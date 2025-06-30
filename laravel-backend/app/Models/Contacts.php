<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Contact",
 *     type="object",
 *     title="Contact",
 *     description="Contact model",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         format="int64",
 *         description="Contact ID",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="firstName",
 *         type="string",
 *         description="Contact first name",
 *         example="John"
 *     ),
 *     @OA\Property(
 *         property="lastName",
 *         type="string",
 *         description="Contact last name",
 *         example="Doe"
 *     ),
 *     @OA\Property(
 *         property="phone",
 *         type="string",
 *         description="Contact phone number",
 *         example="+380123456789"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         format="email",
 *         description="Contact email address",
 *         example="john.doe@example.com"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="Creation timestamp",
 *         example="2024-01-01T12:00:00.000000Z"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="Last update timestamp",
 *         example="2024-01-01T12:00:00.000000Z"
 *     )
 * )
 */
class Contacts extends Model
{
    protected $fillable = ['firstName', 'lastName', 'phone', 'email'];
}
