<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    /**
     * Get all contacts
     *
     * @return Collection
     */
    public function index(): Collection
    {
        return Contacts::all();
    }

    /**
     * Create a new contact.
     *
     * @param Request $request
     * @return JsonResponse
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
     * Get a single contact.
     *
     * @param Contacts $contact
     * @return JsonResponse
     */
    public function show(Contacts $contact): JsonResponse
    {
        return response()->json($contact);
    }

    /**
     * Update a contact.
     *
     * @param Request $request
     * @param Contacts $contact
     * @return JsonResponse
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
     * Delete a contact.
     *
     * @param Contacts $contact
     * @return JsonResponse
     */
    public function destroy(Contacts $contact): JsonResponse
    {
        $contact->delete();
        return response()->json(null, 204);
    }
}
