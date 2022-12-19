package com.nashtech.rookies;

import com.nashtech.rookies.entity.*;
import com.nashtech.rookies.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@Configuration
public class initDatabase {
	
	@Autowired
	PasswordEncoder passwordEncoder;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    AssetRepository assetRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    AssignmentRepository assignmentRepository;

    @Autowired
    ReturnRequestRepository returnRequestRepository;
	
    @Bean
    CommandLineRunner loadDatabase() {
        return args -> {
            usersRepository.deleteAll();
            assetRepository.deleteAll();
            categoryRepository.deleteAll();
            assignmentRepository.deleteAll();
            returnRequestRepository.deleteAll();

            //            region Users
            for(int i = 1; i <= 30; i++) {
                usersRepository.save(new Users(
                        "user" + i,
                        passwordEncoder.encode("User123456!@"),
                        true,
                        "dev",
                        "cute",
                        randomGender(),
                        randomDob(),
                        renderLocationUser(i),
                        new Date(),
                        "ADMIN",
                        renderCodeUser(i)
                ));
            }

            for(int i = 31; i <= 60; i++) {
                usersRepository.save(new Users(
                        "user" + i,
                        passwordEncoder.encode("User123456!@"),
                        true,
                        "dev",
                        "cute",
                        randomGender(),
                        randomDob(),
                        renderLocationUser(i),
                        new Date(),
                        "STAFF",
                        renderCodeUser(i)
                ));
            }

        };
    }


    private String renderCodeUser(int i){
        if(i < 10){
            return "SD000" + i;
        }
        else if (i >= 10 && i < 100){
            return "SD00" + i;
        }
        else {
            return "SD0" + i;
        }
    }

    private String renderLocationUser(int i){
        if(i % 2 == 0)
            return "HCM";
        else
            return "HN";
    }

    private boolean randomGender(){
        boolean[] states = {true, false};
        return states[new Random().nextInt(states.length)];
    }

    private Date randomDob(){
        Random random = new Random();
        int minDay = (int) LocalDate.of(1990, 1, 1).toEpochDay();
        int maxDay = (int) LocalDate.of(2000, 1, 1).toEpochDay();
        long randomDay = minDay + random.nextInt(maxDay - minDay);

        LocalDate randomBirthDate = LocalDate.ofEpochDay(randomDay);
        return java.sql.Date.valueOf(randomBirthDate);
    }
}
