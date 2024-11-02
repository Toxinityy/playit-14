"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  address: string;
}

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  address?: string;
}

interface Provinsi {
  provinsi_id: number;
  nama: string;
}

interface Kabupaten {
  kabupaten_id: number;
  nama: string;
}

interface Kecamatan {
  kecamatan_id: number;
  nama: string;
}

interface Kelurahan {
  kelurahan_id: number;
  nama: string;
}

const fetchProvinsi = async () => {
  const { data: provinsiData } = await axios.get<Provinsi[]>("http://192.168.77.90:5000/api/provinsi");
  return provinsiData;
};

const fetchKabupaten = async (provinsiId: number) => {
  const { data: kabupatenData } = await axios.get<Kabupaten[]>(`http://192.168.77.90:5000/api/kabupaten/${provinsiId}`);
  return kabupatenData;
};

const fetchKecamatan = async (kabupatenId: number) => {
  const { data: kecamatanData } = await axios.get<Kecamatan[]>(`http://192.168.77.90:5000/api/kecamatan/${kabupatenId}`);
  return kecamatanData;
};

const fetchKelurahan = async (kecamatanId: number) => {
  const { data: kelurahan } = await axios.get<Kelurahan[]>(`http://192.168.77.90:5000/api/kelurahan/${kecamatanId}`);
  return kelurahan;
};

const RegistrationPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    address: "",
  });

  const [selectedKelurahanId, setSelectedKelurahanId] = useState<number>();
  const [provinsi, setProvinsi] = useState<Provinsi[]>();
  const [kabupaten, setKabupaten] = useState<Kabupaten[]>();
  const [kecamatan, setKecamatan] = useState<Kecamatan[]>();
  const [kelurahan, setKelurahan] = useState<Kelurahan[]>();

  useEffect(() => {
    const fetchData = async () => {
      const provinsiData = await fetchProvinsi();
      setProvinsi(provinsiData);

      const kabupatenData = await fetchKabupaten(provinsiData[0].provinsi_id);
      setKabupaten(kabupatenData);

      const kecamatanData = await fetchKecamatan(kabupatenData[0].kabupaten_id);
      setKecamatan(kecamatanData);

      const kelurahanData = await fetchKelurahan(kecamatanData[0].kecamatan_id);
      setKelurahan(kelurahanData);

      setSelectedKelurahanId(kelurahanData[0].kelurahan_id);
    };
    fetchData();
  }, []);

  const handleProvinsiChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvinsi = e.target.value;

    const kabupatenData = await fetchKabupaten(Number(selectedProvinsi));
    setKabupaten(kabupatenData);

    const kecamatanData = await fetchKecamatan(kabupatenData[0].kabupaten_id);
    setKecamatan(kecamatanData);

    const kelurahanData = await fetchKelurahan(kecamatanData[0].kecamatan_id);
    setKelurahan(kelurahanData);

    setSelectedKelurahanId(kelurahanData[0].kelurahan_id);
  };

  const handleKabupatenChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKabupaten = e.target.value;

    const kecamatanData = await fetchKecamatan(Number(selectedKabupaten));
    setKecamatan(kecamatanData);

    const kelurahanData = await fetchKelurahan(kecamatanData[0].kecamatan_id);
    setKelurahan(kelurahanData);
    setSelectedKelurahanId(kelurahanData[0].kelurahan_id);
  };

  const handleKecamatanChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKecamatan = e.target.value;

    const kelurahanData = await fetchKelurahan(Number(selectedKecamatan));
    setKelurahan(kelurahanData);
    setSelectedKelurahanId(kelurahanData[0].kelurahan_id);
  };

  const handleKelurahanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedKelurahan = e.target.value;

    console.log(e.target.value);

    setSelectedKelurahanId(Number(selectedKelurahan));
  };

  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Confirm Address validation
    if (!formData.address) {
      newErrors.confirmPassword = "Please enter your address";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Here you would typically make an API call to register the user

      const { data } = await axios.post("http://192.168.77.90:5000/api/register", {
        nama: formData.username,
        email: formData.email,
        password: formData.password,
        alamat_resmi: formData.address,
        kelurahan_id: selectedKelurahanId,
      });

      console.log(formData);
      console.log(selectedKelurahanId);
      setSuccess(true);
      setErrors({});
    } else {
      setErrors(newErrors);
      setSuccess(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to register</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label>Provinsi : </Label>
              <select
                name="provinsi"
                onChange={(e) => {
                  handleProvinsiChange(e);
                }}
                className="text-sm"
              >
                {provinsi?.map((p) => {
                  return (
                    <option
                      value={p.provinsi_id}
                      key={p.provinsi_id}
                    >
                      {p.nama}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Kabupaten : </Label>
              <select
                name="kabupaten"
                className="text-sm"
                onChange={(e) => {
                  handleKabupatenChange(e);
                }}
              >
                {kabupaten?.map((p) => {
                  return (
                    <option
                      value={p.kabupaten_id}
                      key={p.kabupaten_id}
                    >
                      {p.nama}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Kecamatan : </Label>
              <select
                name="kecamatan"
                className="text-sm"
                onChange={(e) => {
                  handleKecamatanChange(e);
                }}
              >
                {kecamatan?.map((p) => {
                  return (
                    <option
                      value={p.kecamatan_id}
                      key={p.kecamatan_id}
                    >
                      {p.nama}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Kelurahan : </Label>
              <select
                name="kelurahan"
                className="text-sm"
                onChange={(e) => {
                  handleKelurahanChange(e);
                }}
              >
                {kelurahan?.map((p) => {
                  return (
                    <option
                      value={p.kelurahan_id}
                      key={p.kelurahan_id}
                    >
                      {p.nama}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            {success && (
              <Alert className="bg-green-50">
                <AlertDescription className="text-green-600">Registration successful! You can now login.</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
            >
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline"
            >
              Login here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationPage;
