package com.nashtech.rookies.utils;

import com.nashtech.rookies.entity.Users;
import com.nashtech.rookies.security.userprincal.UserPrinciple;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class UserUtil {

	public boolean isValidDate(String strDate) {
		String regex = "^(3[01]|[12][0-9]|0[1-9])/(1[0-2]|0[1-9])/[0-9]{4}$";

		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher((CharSequence) strDate);

		if (matcher.matches() == false) {
			return false;
		}

		Date date = convertStrDateToObDate(strDate);

		LocalDateTime ldt = LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());

		if (Integer.parseInt(strDate.split("/")[0]) != ldt.getDayOfMonth()) {
			return false;
		}

		return true;
	}

	public boolean isValidAge(Date dob) {
		final int startYear = 1900;
		int nowYear = Year.now().getValue();

		@SuppressWarnings("deprecation")
		int dobYear = dob.getYear() + startYear;

		if (nowYear - dobYear < 18) {
			return false;
		}

		return true;
	}

	public String firstLetterWord(String str) {
		String result = "";

		boolean v = true;

		for (int i = 0; i < str.length(); i++) {
			if (str.charAt(i) == ' ') {
				v = true;
			} else if (str.charAt(i) != ' ' && v == true) {
				result += (str.charAt(i));
				v = false;
			}
		}
		return result.toLowerCase();
	}

	public String capitalizeWord(String str) {
		str = str.trim();
		str = str.replaceAll("\\s+", " ");
		String words[] = str.split("\\s");
		String capitalizeWord = "";
		for (String w : words) {
			String first = w.substring(0, 1);
			String afterfirst = w.substring(1);
			capitalizeWord += first.toUpperCase() + afterfirst + " ";
		}
		return capitalizeWord.trim();
	}

	public Date convertStrDateToObDate(String strDate) {
		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		Date date = null;
		try {
			date = format.parse(strDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	public String generatePrefixUsername(String firstName, String lastName) {
		return firstName.toLowerCase() + firstLetterWord(lastName);
	}

	public String generateCode(Long count) {
		count += 1;
		final String prefix = "SD";
		String code = "";

		if (count < 10) {
			code = prefix + "000" + count;
		} else if (count < 100) {
			code = prefix + "00" + count;
		} else if (count < 1000) {
			code = prefix + "0" + count;
		} else {
			code = prefix + count;
		}

		return code;
	}

	public String generateSuffixUsername(List<Users> users, String username) {
		if (users.size() == 1 && users.get(0).getUsername().equals(username)) {
			return "1";
		}
		int length = 0;
		boolean check = true;

		for (Users user : users) {
			if (user.getUsername().length() > username.length()) {
				if (user.getUsername().charAt(username.length()) >= '1'
						&& user.getUsername().charAt(username.length()) <= '9') {
					length++;
				}
			} else if (user.getUsername().equals(username)) {
				check = false;
			}

		}
		if (length == 0 && check) {
			return "";
		}
		return length + 1 + "";
	}

	public String generatePassword(String username, String dob) {
		String passwordDate = dob.split("/")[0] + dob.split("/")[1] + dob.split("/")[2];
		return username + "@" + passwordDate;
	}

	public String getAddressFromUserPrinciple() {
		UserPrinciple userPrinciple = new UserPrinciple();

		try {
			userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return userPrinciple.getLocation();
	}

	public Long getIdFromUserPrinciple() {
		UserPrinciple userPrinciple = new UserPrinciple();

		try {
			userPrinciple = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return userPrinciple.getId();
	}

	public Date generateFormatNowDay() {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

		Date nowDate = null;
		try {
			nowDate = formatter.parse(formatter.format(new Date()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return nowDate;
	}

}
