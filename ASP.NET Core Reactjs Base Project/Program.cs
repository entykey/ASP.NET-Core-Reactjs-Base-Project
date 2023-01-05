// NET 7 program.cs is just the same as in ASP.NET Core 6:
using ASP.NET_Core_Reactjs_Base_Project.Data.Models;
using ASP.NET_Core_Reactjs_Base_Project.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using ASP.NET_Core_Reactjs_Base_Project.Services.Implementations;
using ASP.NET_Core_Reactjs_Base_Project.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using AutoMapper;
using System.Text;
using Microsoft.OpenApi.Models; // swagger ui


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add Swagger UI for api debugging:
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Tứng hay ho's WebApi",
        Description = "ENTYKEY AspNetCore7.0 WebApi",
        TermsOfService = new Uri("https://example.com/terms"),
        Contact = new OpenApiContact
        {
            Name = "Nguyễn Hữu Anh Tuấn's facebook",
            Email = "4701104228@student.hcmue.edu.vn",   // string.Empty
            Url = new Uri("https://fb.com/nguyen.tuan.entykey"),
        },
        License = new OpenApiLicense
        {
            Name = "Use under LICX",
            Url = new Uri("https://example.com/license"),
        }
    });
    // Configuring Swagger UI Authorization with Swagger
    // Accepting Bearer Token:
    // tutorial: https://code-maze.com/swagger-authorization-aspnet-core
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
            {
                new OpenApiSecurityScheme
                {
                     Reference = new OpenApiReference
                     {
                         Type=ReferenceType.SecurityScheme,
                         Id="Bearer"
                     }
                },
                new string[]{}
            }
    });
    // End of Configuring Authorization with Swagger UI accept bearerJWT
});

// Add CORS: ( dont need to add, just useCors at bottom )
//builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));


// Inject Framework Services

// net 6 way to pass connStr into sqlServer by enityframework: https://stackoverflow.com/questions/69472240/asp-net-6-identity-sqlite-services-adddbcontext-how
// or from old .nets -> just declare builder like : "builder.Configuration...." instead of "Configuration..."
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ExampleDbContext>(options =>
   options.UseSqlServer(connectionString));

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
})
.AddEntityFrameworkStores<ExampleDbContext>()
.AddDefaultTokenProviders();

// Add JWT Authentication
JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

// Inject Application Services
builder.Services.AddTransient<IUserService, UserService>();

builder.Services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = builder.Configuration["JwtIssuer"],
                        ValidAudience = builder.Configuration["JwtIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtKey"])),
                        ClockSkew = TimeSpan.Zero // remove delay of token when expire
                    };
                });

// AutoMapper, of course (remember to install both 2: AutoMapper & AutoMapper.Extensions.Microsoft.DependencyInjection)
//builder.Services.AddAutoMapper(); // old .net versions  way
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());    // .net 6.x +  way   (https://stackoverflow.com/questions/40275195/how-to-set-up-automapper-in-asp-net-core)


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Use Swagger UI to debug API: (https://localhost:7084/swagger)
app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ENTYKEY AspNetCore 7 WebApi v1");
});


app.UseHttpsRedirection();
app.UseStaticFiles();   // dont need UseSpa
app.UseRouting();

// this one UseCors code solve all the CORS issues !! (preference: https://briancaos.wordpress.com/2022/10/03/net-api-cors-response-to-preflight-request-doesnt-pass-access-control-check-no-access-control-allow-origin-header-net-api/)
app.UseCors(builder =>
{
    builder
       //.AllowAnyOrigin()  // .net dont allow AllowAnyOrigin together with AllowCredentials
       .WithOrigins("http://localhost:44429", "https://localhost:44429") // set your origins here
       .SetIsOriginAllowedToAllowWildcardSubdomains()
       .AllowAnyHeader()
       .AllowCredentials()
       .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS")
       .SetPreflightMaxAge(TimeSpan.FromSeconds(3600));
});


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
