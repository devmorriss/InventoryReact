using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(dest => dest.HostUsername,
                    opt => opt.MapFrom(source => source.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(source => source.AppUser.DisplayName))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(source => source.AppUser.UserName))
                .ForMember(dest => dest.Bio, opt => opt.MapFrom(source => source.AppUser.Bio))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(source => source.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(source => source.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}