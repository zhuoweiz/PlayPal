package com.example.server.controller;

import com.example.server.service.PetService;
import com.example.server.dto.PetData;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController {

	@Resource(name = "petService")
	private PetService petService;

	/**
	 * <p>Get all pet data in the system.For production system you many want to use
	 * pagination.</p>
	 * @return List<PetData>
	 */
	@GetMapping
	public List<PetData> getPets() {
		return petService.getAllPets();
	}

	/**
	 * Method to get the pet data based on the ID.
	 * @param id
	 * @return PetData
	 */
	@GetMapping("/pet/{id}")
	public PetData getPet(@PathVariable Long id) {
		System.out.println("GET PET BY ID");
		return petService.getPetById(id);
	}

	/**
	 * Post request to create pet information int the system.
	 * @param petData
	 * @return
	 */
	@PostMapping("/pet")
	public PetData savePet(final @RequestBody PetData petData) {
		System.out.println("Post new pet === " + petData.toString());
		return petService.savePet(petData);
	}

	/**
	 * <p>Delete pet from the system based on the ID. The method mapping is like the getPet with difference of
	 * @DeleteMapping and @GetMapping</p>
	 * @param id
	 * @return
	 */
	@DeleteMapping("/pet/{id}")
	public Boolean deletePet(@PathVariable Long id) {
		return petService.deletePet(id);
	}

}
