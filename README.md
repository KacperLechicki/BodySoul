## BodySoul is gym registration system for gym workers, that allows them to add informations about new clients

### This web application was made to practice using angular and angular material

> While creating this project, I used angular material components, routing, api service, additional npm packages, json-server and standard angular features.

To check and use the project, you must first copy the repository into the code editor. You can do this with the command:

```
git pull https://github.com/KacperLechicki/BodySoul
```

Then you need to install all packages:

```
npm install --force
```

And finally start the server:

```
json-server --watch db.json
```

As the start page of the application, you will see the registration form for a new gym client. This is an angular reactive form.

![Zrzut ekranu 2023-02-23 o 08 17 58](https://user-images.githubusercontent.com/118530164/220844971-54741864-5412-412c-8160-ba3e5f97ed5a.png)

It has basic validation. All fields are required except bmi and bmi result as they are calculated automatically based on your height and weight.

![Zrzut ekranu 2023-02-23 o 08 18 17](https://user-images.githubusercontent.com/118530164/220845207-4f402790-743b-4d94-ad6f-0c72d4bb168f.png)

![Zrzut ekranu 2023-02-23 o 08 19 10](https://user-images.githubusercontent.com/118530164/220845262-4de714dc-fa7c-4d9a-9c3c-719586d59b3e.png)

When we add a customer, we are transferred to a subpage with a list of all customers, where we can sort, filter, see details, edit or delete them.

![Zrzut ekranu 2023-02-23 o 08 20 21](https://user-images.githubusercontent.com/118530164/220845478-d12f2555-99ab-4062-80bc-bba0be0c1ac6.png)

Details are displayed on a separate subpage in card format.

![Zrzut ekranu 2023-02-23 o 08 20 42](https://user-images.githubusercontent.com/118530164/220845676-fe3f4ac9-bf19-432c-9d36-ef85788e01a5.png)

When we click on the edit option, we will return to the form, but the fields will be filled with customer details that we can change. The form continues to validate.

![Zrzut ekranu 2023-02-23 o 08 20 59](https://user-images.githubusercontent.com/118530164/220846446-66e2ecca-7a0f-4793-8162-efa06485eb86.png)

![Zrzut ekranu 2023-02-23 o 08 21 19](https://user-images.githubusercontent.com/118530164/220846679-6fb3cccd-0a04-4b69-a1e1-e7f83fbac1e8.png)

When we wish to remove a customer, we will be asked to confirm our decision.

![Zrzut ekranu 2023-02-23 o 08 21 33](https://user-images.githubusercontent.com/118530164/220847006-0d230e9f-2353-4266-bc5c-492519197431.png)

![Zrzut ekranu 2023-02-23 o 08 21 47](https://user-images.githubusercontent.com/118530164/220847117-81b64397-867c-4e0e-99e9-8688ae718b75.png)

The table has a paginator and a filter that allows you to search for items by examining all the data.

![Zrzut ekranu 2023-02-23 o 08 23 16](https://user-images.githubusercontent.com/118530164/220847586-dff205c9-cf7b-4d10-a79a-4911b99088f9.png)

![Zrzut ekranu 2023-02-23 o 08 23 32](https://user-images.githubusercontent.com/118530164/220847632-ca960ece-b755-42c2-88c5-c29ff561dce1.png)

> Thanks to this project, I gained more confidence in navigating and using angular, and also learned how to use angular material components.
