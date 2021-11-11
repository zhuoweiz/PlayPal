package com.example.server.service;


import com.example.server.dto.PetData;

import java.util.List;
public interface PetService {
	PetData savePet(PetData pet);
	boolean deletePet(final Long petId);
	List<PetData> getAllPets();
	PetData getPetById(final Long petId);
}



//public interface CustomerService {
//
//	CustomerData saveCustomer(CustomerData customer);
//	boolean deleteCustomer(final Long customerId);
//	List<CustomerData> getAllCustomers();
//	CustomerData getCustomerById(final Long customerId);
//}
