describe("User V1 Route", () => {
  describe("get /bff/msrs/users/v1/common-config/:configName", () => {
    afterEach(jest.restoreAllMocks);

    it("should response with OK status", async () => {
      jest.spyOn(jwtHelper, "isValidToken").mockReturnValue(true);
      jest.spyOn(httpRequest, "post").mockResolvedValue({ data: {} });

      const url = "/bff/msrs/users/v1/common-config/config_name";
      return await request(app)
        .get(url)
        .set({ jwttoken: TestVariables.ValidJWTToken })
        .expect(200)
        .then((result) => {
          expect(jwtHelper.isValidToken).toHaveBeenCalledTimes(
            JWT.ISTIO_ENABLED ? 0 : 1
          );
          expect(responseWithStatusOK(result)).toEqual(true);
        });
    });
  });
});
