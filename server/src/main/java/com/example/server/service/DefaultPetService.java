package com.example.server.service;

import com.example.server.data.Pet;
import com.example.server.dto.PetData;
import com.example.server.repository.PetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("petService")
public class DefaultPetService implements PetService {

	@Autowired
	private PetRepository petRepository;

	/**
	 * Create a pet based on the data sent to the service class.
	 * @param petData
	 * @return DTO representation of the pet
	 */
	@Override
	public PetData savePet(PetData petData) {
		Pet petModel = populatePetEntity(petData);
		return populatePetData((petRepository.save(petModel)));
	}

	/**
	 * Delete pet based on the pet ID.We can also use other option to delete pet
	 * based on the entity (passing JPA entity class as method parameter)
	 * @param petId
	 * @return boolean flag showing the request status
	 */
	@Override
	public boolean deletePet(Long petId) {
		petRepository.deleteById(petId);
		return true;
	}

	/**
	 * Method to return the list of all the pets in the system.This is a simple
	 * implementation but use pagination in the real world example.
	 * @return list of pet
	 */
	@Override
	public List<PetData> getAllPets() {
		List<PetData> petsData = new ArrayList<> ();
		List<Pet> petList = petRepository.findAll();
		petList.forEach(pet -> {
			petsData.add(populatePetData(pet));
		});
		return petsData;
	}

	/**
	 * Get pet by ID. The service will send the pet data else will throw the exception.
	 * @param petId
	 * @return PetData
	 */
	@Override
	public PetData getPetById(Long petId) {
		return populatePetData(petRepository.findById(petId).orElseThrow(() ->
			new EntityNotFoundException("Pet not found!")
		));
	}

	/**
	 * Internal method to convert Customer JPA entity to the DTO object
	 * for frontend data
	 * @param pet
	 * @return PetData
	 */
	private PetData populatePetData(final Pet pet){
		PetData petData = new PetData();
		petData.setId(pet.getId());
		petData.setName(pet.getName());
		petData.setOwner(pet.getOwner());

		return  petData;
	}

	/**
	 * Method to map the frontend customer object to the JPA customer entity.
	 * @param petData
	 * @return Pet
	 */
	private Pet populatePetEntity(PetData petData){
		Pet pet = new Pet();
		pet.setName(petData.getName());
		pet.setOwner(petData.getOwner());
		return pet;
	}

}
