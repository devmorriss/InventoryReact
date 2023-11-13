using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(dest => dest.HostUsername,
                    opt => opt.MapFrom(source => source.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(source => source.AppUser.DisplayName))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(source => source.AppUser.UserName))
                .ForMember(dest => dest.Bio, opt => opt.MapFrom(source => source.AppUser.Bio))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(source => source.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(source => source.AppUser.Followers.Count))
                .ForMember(dest => dest.FollowingCount, opt => opt.MapFrom(source => source.AppUser.Followings.Count))
                .ForMember(dest => dest.Following, opt => opt.MapFrom(source => source.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(source => source.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(source => source.Followers.Count))
                .ForMember(dest => dest.FollowingCount, opt => opt.MapFrom(source => source.Followings.Count))
                .ForMember(dest => dest.Following, opt => opt.MapFrom(source => source.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<Comment, CommentDto>()
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(source => source.Author.DisplayName))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(source => source.Author.UserName))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(source => source.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

        }
    }
}