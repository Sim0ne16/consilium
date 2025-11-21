package eu.consilium.core.util.mapper;


import eu.consilium.core.model.dto.consulting.ConsultingRequestDTO;
import eu.consilium.core.model.entity.consulting.ConsultingRequestEntity;
import eu.consilium.core.model.enums.ConsultingCategory;
import eu.consilium.core.model.enums.ConsultingStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class ConsultingMapper {
    private final UserMapper userMapper;

    public ConsultingRequestDTO toDTO(ConsultingRequestEntity consultingRequestEntity) {
        return ConsultingRequestDTO.builder()
                .id(consultingRequestEntity.getId())
                .requester(userMapper.toDTO(consultingRequestEntity.getRequester()))
                .consultant(consultingRequestEntity.getConsultant() != null ? userMapper.toDTO(consultingRequestEntity.getConsultant()) : null)
                .category(consultingRequestEntity.getCategory().name())
                .description(consultingRequestEntity.getDescription())
                .status(consultingRequestEntity.getStatus().name())
                .createdAt(consultingRequestEntity.getCreatedAt())
                .build();
    }

    public ConsultingRequestEntity toEntity(ConsultingRequestDTO consultingRequestDTO) {
        return ConsultingRequestEntity.builder()
                .id(consultingRequestDTO.getId())
                .requester(userMapper.toEntity(consultingRequestDTO.getRequester()))
                .consultant(consultingRequestDTO.getConsultant() != null ? userMapper.toEntity(consultingRequestDTO.getConsultant()) : null)
                .category(ConsultingCategory.valueOf(consultingRequestDTO.getCategory()))
                .description(consultingRequestDTO.getDescription())
                .status(ConsultingStatus.valueOf(consultingRequestDTO.getStatus()))
                .createdAt(consultingRequestDTO.getCreatedAt() != null ? consultingRequestDTO.getCreatedAt() : LocalDateTime.now())
                .build();
    }
}
