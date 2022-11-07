from flask import request

# auth data validation classes
class DataValidator:

    def __init__(self, min=None, max=None):
        self.max = max
        self.min = min
    
    def __set_name__(self, owner_class, name):
        self.name = name

    def error_message(self, error_type, custom_message=None):
        if error_type == TypeError:
            if custom_message:
                raise TypeError(custom_message)
            else:
                raise TypeError(f"{self.name} contains invalid characters")
        elif error_type == ValueError:
            if custom_message:
                raise ValueError(custom_message)
            elif self.min is not None and self.max is not None:
                raise ValueError(f"{self.name} must be between {self.min} and {self.max} characters long")

    def __get__(self, instance, owner_class):
        if instance is None:
            return self
        else:
            return instance.__dict__.get(self.name, None)    

class Email(DataValidator):
    def __set__(self, instance, value):
        if "signup" in request.path:
            if not isinstance(value, str):
                self.error_message(TypeError)
            if "@" not in value:
                self.error_message(ValueError, "Entered email not valid")
            else:
                if self.min is not None and len(value) < self.min:
                    self.error_message(ValueError, f"{self.name.capitalize()} should be at least {self.min} characters long")
                elif self.max is not None and len(value) > self.max:
                    self.error_message(ValueError, f"{self.name.capitalize()} cannot be longer {self.max} characters")
        instance.__dict__[self.name] = value

class Password(DataValidator):
    def __set__(self, instance, value):
        upper_case_characters = any([char.isupper() for char in value])
        numeric_characters = any([char.isdigit() for char in value])
        if "signup" in request.path:
            if not isinstance(value, str):
                self.error_message(TypeError)
            else:
                if upper_case_characters == False:
                    self.error_message(ValueError, "Password should contain at least one uppercase character")
                elif numeric_characters == False:
                    self.error_message(ValueError, "Password should contain at least one numeric character")
                if self.min is not None and len(value) < self.min:
                    self.error_message(ValueError, f"{self.name.capitalize()} should be at least {self.min} characters long")
                elif self.max is not None and len(value) > self.max:
                    self.error_message(ValueError, f"{self.name.capitalize()} cannot be longer {self.max} characters")
        instance.__dict__[self.name] = value

class Name(DataValidator):
    def __set__(self, instance, value):
        if not isinstance(value, str):
            self.error_message(TypeError)
        else:
            if self.min is not None and len(value) < self.min:
                self.error_message(ValueError, f"{self.name.capitalize()} should be at least {self.min} characters long")
            elif self.max is not None and len(value) > self.max:
                self.error_message(ValueError, f"{self.name.capitalize()} cannot be longer than {self.max} characters")
        instance.__dict__[self.name] = value

class User:
    first_name = Name(1)
    last_name = Name(1)
    email = Email(6)
    password = Password(8)
    password_confirmation = Password(8) 