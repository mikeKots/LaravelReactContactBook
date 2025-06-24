<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/contacts",
     *     summary="Get all contacts",
     *     tags={"Contacts"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of contacts",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Contact"))
     *     )
     * )
     */
    public function index(): Collection
    {
        return Contacts::all();
    }

    /**
     * @OA\Post(
     *     path="/api/contacts",
     *     summary="Create a new contact",
     *     tags={"Contacts"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"firstName","lastName","phone","email"},
     *             @OA\Property(property="firstName", type="string", example="John"),
     *             @OA\Property(property="lastName", type="string", example="Doe"),
     *             @OA\Property(property="phone", type="string", example="+380123456789"),
     *             @OA\Property(property="email", type="string", format="email", example="john.doe@example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Contact created",
     *         @OA\JsonContent(ref="#/components/schemas/Contact")
     *     ),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|unique:contacts,email',
        ]);

        $contact = Contacts::create($data);
        return response()->json($contact, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/contacts/{id}",
     *     summary="Get a single contact",
     *     tags={"Contacts"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Contact ID",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Contact data",
     *         @OA\JsonContent(ref="#/components/schemas/Contact")
     *     ),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function show(Contacts $contact): JsonResponse
    {
        return response()->json($contact);
    }

    /**
     * @OA\Put(
     *     path="/api/contacts/{id}",
     *     summary="Update a contact",
     *     tags={"Contacts"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Contact ID",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"firstName","lastName","phone","email"},
     *             @OA\Property(property="firstName", type="string", example="John"),
     *             @OA\Property(property="lastName", type="string", example="Doe"),
     *             @OA\Property(property="phone", type="string", example="+380123456789"),
     *             @OA\Property(property="email", type="string", format="email", example="john.doe@example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Updated contact",
     *         @OA\JsonContent(ref="#/components/schemas/Contact")
     *     ),
     *     @OA\Response(response=422, description="Validation error"),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function update(Request $request, Contacts $contact): JsonResponse
    {
        $data = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|unique:contacts,email',
        ]);

        $contact->update($data);
        return response()->json($contact);
    }

    /**
     * @OA\Delete(
     *     path="/api/contacts/{id}",
     *     summary="Delete a contact",
     *     tags={"Contacts"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Contact ID",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Deleted successfully"
     *     ),
     *     @OA\Response(response=404, description="Not found")
     * )
     */
    public function destroy(Contacts $contact): JsonResponse
    {
        $contact->delete();
        return response()->json(null, 204);
    }
}
